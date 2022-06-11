var loggedIn = false;

function changeLogStatus(){
    this.loggedIn = !loggedIn;
}

function getLogStatus(){
    return this.loggedIn;
}
export {getLogStatus, changeLogStatus};
