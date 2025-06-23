module.exports = class UserDto {
    // Data transfer object
    email;
    id;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
    }
}