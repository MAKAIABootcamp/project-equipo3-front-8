import React from 'react'

const StatsInfo = ({ count, label }) => {
    return (
        <div className="flex flex-col items-center justify-center cursor-normal">
            <span className="text-lg font-black leading-none ">{count}</span>
            <span className="text-[10px] text-grey-dim font-bold">{label}</span>
        </div>
    )
}

export default StatsInfo