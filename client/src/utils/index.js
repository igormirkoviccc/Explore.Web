export const formatDateTime = (input) =>{
    if(input){
        const dateTime = input.split("T");
        const date = dateTime[0].split('-');
        const time = dateTime[1].split(':');
        return `${date[2]}/${date[1]}/${date[0]}`
    }
    return '';
}
