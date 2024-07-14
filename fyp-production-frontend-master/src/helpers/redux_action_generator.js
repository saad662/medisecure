const reduxActionGenerator = actionName => ({
    REQUEST: `${actionName}_REQUEST`,
    SUCCESS: `${actionName}_SUCCESS`,
    FAIL: `${actionName}_FAIL`,
    COMPLETE: `${actionName}_COMPLETE`,
    actionName,
});

export default reduxActionGenerator;
