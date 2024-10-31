import StatsInfo from "../Common/Stats/StatsInfo"

const statsPanelData = [
    { count: 1, label: "reviews" },


]
const StatsPanel = ({statsItems}) => {

    return (
        <div className="flex flex-col gap-4">
            {statsItems.map((item,index) => (
                <StatsInfo key={item.label} count={item.count} label={item.label} />
            ))}
        </div>
    )
}

export default StatsPanel