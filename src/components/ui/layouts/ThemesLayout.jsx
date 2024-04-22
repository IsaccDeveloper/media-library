import ThemePreviewCard from "../cards/ThemePreviewCard"


function ThemesLayout({ themes, validateToken }) {

    return (
        <div className='w-full h-[92%] overflow-y-auto p-6 bg-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
            {themes.map((theme) => (
                <ThemePreviewCard theme={theme} key={theme._id} />
            ))}
        </div>
    )
}

export default ThemesLayout
