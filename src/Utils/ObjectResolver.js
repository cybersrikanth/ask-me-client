export const objectResolve = (path, obj) => {
    return path.split(".").reduce(function (prev, curr) {
        return prev ? prev[curr] : null;
    }, obj);
};
