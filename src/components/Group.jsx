import AssetList from "./AssetList";
import PieChart from "./PieChart";

export default function Group({ group }) {
    return (
        <div>
            <PieChart 
                data={group.assets} 
                total={group.total} 
                category={group.category}
            />
        </div>
    )
}