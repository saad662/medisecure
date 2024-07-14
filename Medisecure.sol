// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IMedisecure {
    struct Medicine {
        string medicine_id;
        string name;
        string description;
        string manufacturer;
        string category;
        string formula;
        string chemicals;
        string medicine_type;
    }

    function add_medicine(
        string calldata medicine_id,
        string calldata name,
        string calldata description,
        string calldata manufacturer,
        string calldata category,
        string calldata formula,
        string calldata chemicals,
        string calldata medicine_type
    ) external returns (bool);

    function view_medicine_by_manufacturer(string calldata manufacturer)
        external
        view
        returns (Medicine[] memory);

    function view_all_medicines() external view returns (Medicine[] memory);

    function view_medicine_by_id(string calldata medicine_id)
        external
        view
        returns (Medicine memory);

    struct Stock {
        string stock_id;
        string medicine_id;
        uint256 price;
        uint256 quantity;
        uint256 manufacture_date;
        uint256 expiry_date;
    }

    function add_stock(
        string calldata stock_id,
        string calldata medicine_id,
        uint256 price,
        uint256 quantity,
        uint256 manufacture_date,
        uint256 expiry_date
    ) external returns (bool);

    function view_stocks_by_medicine_id(string calldata medicine_id)
        external
        view
        returns (Stock[] memory);

    function view_stock_by_id(string calldata stock_id)
        external
        view
        returns (Stock memory);

    function view_all_stocks() external view returns (Stock[] memory);

    function view_stocks_by_manufacturer(string calldata manufacturer)
        external
        view
        returns (Stock[] memory);

    struct Order {
        string order_id;
        string medicine_id;
        uint256 price;
        uint256 quantity;
        uint256 total_price;
        string distributor;
        string status;
        address buyer;
        bytes32 transaction_hash;
    }

    function add_order(
        string calldata order_id,
        string calldata medicine_id,
        uint256 quantity,
        string calldata distributor
    ) external payable returns (bool);

    function view_order_by_id(string calldata order_id)
        external
        view
        returns (Order memory);

    function view_all_orders() external view returns (Order[] memory);

    function view_orders_by_distributor(string calldata distributor)
        external
        view
        returns (Order[] memory, string[] memory, bytes32[] memory);

    function update_order_status(
        string calldata order_id,
        string calldata status
    ) external returns (bool);

    function view_orders_by_manufacturer(string calldata manufacturer)
        external
        view
        returns (Order[] memory);
}

contract Medisecure is IMedisecure {
    mapping(string => Medicine[]) private medicinesByManufacturer;
    mapping(string => Medicine) private medicinesById;
    string[] private medicineIds;

    mapping(string => Stock[]) private stocksByMedicineId;
    mapping(string => Stock) private stocksById;
    mapping(string => Stock[]) private stocksByManufacturer;
    string[] private stockIds;

    mapping(string => Order) private ordersById;
    mapping(string => Order[]) private ordersByDistributor;
    string[] private orderIds;

    mapping(address => uint256) private escrow;

    address public owner;
    bool public isActive;

    uint256 public totalStocks;
    uint256 public totalSoldStocks;
    uint256 public totalOrdersCreated;
    uint256 public remainingStocks;

    constructor() {
        owner = msg.sender;
        isActive = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyActive() {
        require(isActive);
        _;
    }

    function add_medicine(
        string memory medicine_id,
        string memory name,
        string memory description,
        string memory manufacturer,
        string memory category,
        string memory formula,
        string memory chemicals,
        string memory medicine_type
    ) external override onlyActive returns (bool) {
        Medicine memory medicine = Medicine(
            medicine_id,
            name,
            description,
            manufacturer,
            category,
            formula,
            chemicals,
            medicine_type
        );
        medicinesByManufacturer[manufacturer].push(medicine);
        medicinesById[medicine_id] = medicine;
        medicineIds.push(medicine_id);
        return true;
    }

    function view_medicine_by_manufacturer(string calldata manufacturer)
        external
        view
        override
        onlyActive
        returns (Medicine[] memory)
    {
        return medicinesByManufacturer[manufacturer];
    }

    function view_all_medicines()
        external
        view
        override
        onlyActive
        returns (Medicine[] memory)
    {
        uint256 totalMedicines = medicineIds.length;
        Medicine[] memory allMedicines = new Medicine[](totalMedicines);
        for (uint256 i = 0; i < totalMedicines; i++) {
            allMedicines[i] = medicinesById[medicineIds[i]];
        }
        return allMedicines;
    }

    function view_medicine_by_id(string calldata medicine_id)
        external
        view
        override
        onlyActive
        returns (Medicine memory)
    {
        return medicinesById[medicine_id];
    }

    function add_stock(
        string calldata stock_id,
        string calldata medicine_id,
        uint256 price,
        uint256 quantity,
        uint256 manufacture_date,
        uint256 expiry_date
    ) external override onlyActive returns (bool) {
        require(bytes(medicine_id).length > 0);

        Stock memory stock = Stock(
            stock_id,
            medicine_id,
            price,
            quantity,
            manufacture_date,
            expiry_date
        );

        stocksByMedicineId[medicine_id].push(stock);
        stocksByManufacturer[medicinesById[medicine_id].manufacturer].push(
            stock
        );
        stocksById[stock_id] = stock;
        stockIds.push(stock_id);

        totalStocks += quantity;
        remainingStocks += quantity;

        return true;
    }

    function view_stocks_by_manufacturer(string calldata manufacturer)
        external
        view
        override
        onlyActive
        returns (Stock[] memory)
    {
        return stocksByManufacturer[manufacturer];
    }

    function view_stocks_by_medicine_id(string calldata medicine_id)
        external
        view
        override
        onlyActive
        returns (Stock[] memory)
    {
        return stocksByMedicineId[medicine_id];
    }

    function view_stock_by_id(string calldata stock_id)
        external
        view
        override
        onlyActive
        returns (Stock memory)
    {
        return stocksById[stock_id];
    }

    function view_all_stocks() external view override onlyActive returns (Stock[] memory) {
        uint256 totalStocksArray = stockIds.length;
        Stock[] memory allStocks = new Stock[](totalStocksArray);
        for (uint256 i = 0; i < totalStocksArray; i++) {
            allStocks[i] = stocksById[stockIds[i]];
        }
        return allStocks;
    }

    function add_order(
        string calldata order_id,
        string calldata medicine_id,
        uint256 quantity,
        string calldata distributor
    ) external payable override onlyActive returns (bool) {
        require(bytes(medicine_id).length > 0);
        require(quantity > 0);

        // Find the appropriate stock
        Stock[] storage stocks = stocksByMedicineId[medicine_id];
        require(stocks.length > 0);

        uint256 totalPrice = 0;
        uint256 remainingQuantity = quantity;

        for (uint256 i = 0; i < stocks.length && remainingQuantity > 0; i++) {
            Stock storage stock = stocks[i];
            if (stock.quantity >= remainingQuantity) {
                totalPrice += remainingQuantity * stock.price;
                stock.quantity -= remainingQuantity;
                remainingQuantity = 0;
            } else {
                totalPrice += stock.quantity * stock.price;
                remainingQuantity -= stock.quantity;
                stock.quantity = 0;
            }
        }

        require(remainingQuantity == 0);
        require(msg.value == totalPrice);

        // Escrow the funds
        escrow[msg.sender] += msg.value;

        // Create and store the order
        Order memory order = Order(
            order_id,
            medicine_id,
            totalPrice / quantity,
            quantity,
            totalPrice,
            distributor,
            "pending",
            msg.sender,
            blockhash(block.number - 1)
        );
        ordersById[order_id] = order;
        ordersByDistributor[distributor].push(order);
        orderIds.push(order_id);

        totalOrdersCreated += 1;
        totalSoldStocks += quantity;
        remainingStocks -= quantity;

        return true;
    }

    function view_order_by_id(string calldata order_id)
        external
        view
        override
        onlyActive
        returns (Order memory)
    {
        return ordersById[order_id];
    }

    function view_all_orders() external view override onlyActive returns (Order[] memory) {
        uint256 totalOrders = orderIds.length;
        Order[] memory allOrders = new Order[](totalOrders);
        for (uint256 i = 0; i < totalOrders; i++) {
            allOrders[i] = ordersById[orderIds[i]];
        }
        return allOrders;
    }

    function view_orders_by_distributor(string calldata distributor)
        external
        view
        override
        onlyActive
        returns (Order[] memory, string[] memory, bytes32[] memory)
    {
        uint256 totalOrders = ordersByDistributor[distributor].length;
        Order[] memory distributorOrders = new Order[](totalOrders);
        string[] memory medicineNames = new string[](totalOrders);
        bytes32[] memory transactionHashes = new bytes32[](totalOrders);

        for (uint256 i = 0; i < totalOrders; i++) {
            distributorOrders[i] = ordersByDistributor[distributor][i];
            medicineNames[i] = medicinesById[distributorOrders[i].medicine_id].name;
            transactionHashes[i] = distributorOrders[i].transaction_hash;
        }

        return (distributorOrders, medicineNames, transactionHashes);
    }

    function view_orders_by_manufacturer(string calldata manufacturer)
        external
        view
        override
        onlyActive
        returns (Order[] memory)
    {
        uint256 totalOrders = orderIds.length;
        uint256 count = 0;

        for (uint256 i = 0; i < totalOrders; i++) {
            if (keccak256(abi.encodePacked(medicinesById[ordersById[orderIds[i]].medicine_id].manufacturer)) == keccak256(abi.encodePacked(manufacturer))) {
                count++;
            }
        }

        Order[] memory manufacturerOrders = new Order[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < totalOrders; i++) {
            if (keccak256(abi.encodePacked(medicinesById[ordersById[orderIds[i]].medicine_id].manufacturer)) == keccak256(abi.encodePacked(manufacturer))) {
                manufacturerOrders[index] = ordersById[orderIds[i]];
                index++;
            }
        }

        return manufacturerOrders;
    }

    function update_order_status(
        string calldata order_id,
        string calldata status
    ) external override onlyActive returns (bool) {
        require(bytes(order_id).length > 0);
        require(bytes(status).length > 0);

        Order storage order = ordersById[order_id];
        require(bytes(order.order_id).length > 0);

        if (keccak256(abi.encodePacked(order.status)) == keccak256("pending") && keccak256(abi.encodePacked(status)) == keccak256("rejected")) {
            uint256 amount = order.total_price;
            address buyer = order.buyer;
            escrow[buyer] -= amount;
            payable(buyer).transfer(amount);
        }

        order.status = status;

        Order[] storage distributorOrders = ordersByDistributor[order.distributor];
        for (uint256 i = 0; i < distributorOrders.length; i++) {
            if (keccak256(abi.encodePacked(distributorOrders[i].order_id)) == keccak256(abi.encodePacked(order_id))) {
                distributorOrders[i].status = status;
                break;
            }
        }

        if (keccak256(abi.encodePacked(status)) == keccak256("accepted")) {
            uint256 amount = order.total_price;
            escrow[order.buyer] -= amount;
            payable(owner).transfer(amount);
        }

        return true;
    }

    function getTotalNumberOfStocks() external view onlyActive returns (uint256) {
        return totalStocks;
    }

    function getTotalNumberOfSoldStocks() external view onlyActive returns (uint256) {
        return totalSoldStocks;
    }

    function getRemainingStocks() external view onlyActive returns (uint256) {
        return remainingStocks;
    }

    function getTotalNumberOfOrdersCreated() external view onlyActive returns (uint256) {
        return totalOrdersCreated;
    }

}
