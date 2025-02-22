import Group from "./Group";

export default function GroupList({ all }) {
    return (
        <>
            {all.map(group => 
                <Group 
                    key={group.category}
                    group={group} 
                />
            )}
        </>
    )
}