export const MainNav = [
    {
        icon: 'pe-7s-rocket',
        label: 'Dashboard',
        to: '/dashboard',
    },
];
export const ComponentsNav = [
    {
        icon: 'pe-7s-diamond',
        label: 'Medicines',
        content: [
            {
                label: 'View Medicines',
                to: '/medicine',
            },
            {
                label: 'Add Medicines',
                to: '/medicine/add',

            },
        ],
    },
    {
        icon: 'pe-7s-car',
        label: 'Medicine Stocks',
        content: [
            {
                label: 'View Stocks',
                to: '/stocks',
            },
            {
                label: 'Add Stocks',
                to: '/stocks/add',
            },
        ],
    },
];
export const FormsNav = [
    {
        icon: 'pe-7s-light',
        label: 'Controls',
        to: '/forms/controls',
    },
    {
        icon: 'pe-7s-eyedropper',
        label: 'Layouts',
        to: '/forms/layouts',
    },
    {
        icon: 'pe-7s-pendrive',
        label: 'Validation',
        to: '/forms/validation',
    },
];
export const WidgetsNav = [
    {
        icon: 'pe-7s-display2',
        label: 'Orders',
        to: '/orders',
    },
];
export const ChartsNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'ChartJS',
        to: '/charts/chartjs',
    },
];