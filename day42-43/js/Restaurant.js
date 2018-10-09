function Restaurant(obj) {
    this.cash = obj.cash;
    this.seats = obj.seats;
    this.staff = obj.staff;
}
Restaurant.prototype.hire = function(newStaff) {
    this.staff.push(newStaff);
}
Restaurant.prototype.fire = function(oldStaff) {
    this.staff.remove(oldStaff);
}