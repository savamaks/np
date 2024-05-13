export const getHeightAnswer = (child:any) => {
    let heightAnswer = 0;
    for (let index = 0; index < child.length; index++) {
        const coords = child[index].getBoundingClientRect();

        const marginTop = parseInt(getComputedStyle(child[index]).marginTop);
        const marginBottom = parseInt(getComputedStyle(child[index]).marginBottom);
        const paddingTop = parseInt(getComputedStyle(child[index]).paddingTop);
        const paddingBottom = parseInt(getComputedStyle(child[index]).paddingBottom);
        heightAnswer += marginBottom + marginTop + paddingTop + paddingBottom + coords.height;
    }
    return heightAnswer;
};