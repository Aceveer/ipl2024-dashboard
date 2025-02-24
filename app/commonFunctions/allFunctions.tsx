const convertOvers = (overs: string): string => {
    const temp = overs.split("."); // Split the string into whole overs and balls
    let wholeOvers = parseInt(temp[0], 10); // Convert the first part to an integer
    const balls = parseInt(temp[1] || "0", 10); // Convert the second part to an integer (default to 0 if undefined)

    if (balls === 6) {
        wholeOvers += 1; // Increment whole overs if balls are 6
    }
    else{
        wholeOvers = wholeOvers + balls/10;
    }

    return (wholeOvers.toString()); // Return the result as a string
};

export default convertOvers;