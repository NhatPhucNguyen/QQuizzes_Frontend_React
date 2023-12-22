const timeToString = (time:number)=>{
    const timeConverted =
        time > 60
            ? `${Math.floor(time / 60)}m${time % 60}s`
            : `${time}s`;
    return timeConverted;
}
export default timeToString;