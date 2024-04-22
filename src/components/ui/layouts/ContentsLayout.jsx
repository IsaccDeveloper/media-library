import ContentPreviewCard from "../cards/ContentPreviewCard"


function ContentsLayout({ contents, validateToken }) {

    return (
        <div className='w-full h-[92%] overflow-y-auto p-6 bg-gray-200'>
            {contents.map((contentList) => (
                <div key={contentList.theme._id} className='mb-6'>
                    <span className='mb-6 font-bold'>{contentList.theme.name}</span>
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
                        {contentList.contents.map((content, index) => (
                            <ContentPreviewCard content={content} theme={contentList.theme} key={index} handleValidateToken={validateToken} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ContentsLayout
