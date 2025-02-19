import React from 'react'

interface Params {
    id: string; // or number, depending on your use case
}

const CoverLetter = async ({ params }: { params: Params }) => {
    const id = await params.id
    return (
        <div>CoverLetter : {id}</div>
    )
}

export default CoverLetter