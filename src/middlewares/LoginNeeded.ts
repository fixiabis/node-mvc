export function LoginNeeded(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let method = target[propertyKey];

    descriptor.value = function () {
        method.apply(this, arguments);
    };
}