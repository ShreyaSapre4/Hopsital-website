//makes sure request doesn't get stuck in promise

export const catchAsyncError = (theFunction) => {
    return (req, res, next)=>{
        Promise.resolve(theFunction(req, res, next)).catch(next);
    };
};