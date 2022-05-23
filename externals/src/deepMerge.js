export function deepMerge (target, source) {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (source[key] instanceof Object)
                Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source)
    return target;
}
