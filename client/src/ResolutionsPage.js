
function ResolutionsPage ({resolutions}){
    const fakeCards = resolutions.map((res) => <h1>{res.goal_statement}</h1>)
    return <div>
        {fakeCards}
    </div>

}

export default ResolutionsPage