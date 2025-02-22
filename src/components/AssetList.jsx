import Asset from "./Asset";
import MyPieChart from "./PieChart";

export default function AssetList({ assets }) {

    // Example usage:
const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
  ];


//   <div>
//   <p>name: {asset.name}</p>
//   <p>percentage: {asset.percentage}</p>
  
// </div>


    return (
        <>
    <MyPieChart data={assets} />
        {/* <PieChart
            onClick={(e) => 10}
            lineWidth={50}
            paddingAngle={10}
            data={data}
        />; */}
        {assets.map(asset => 
            <Asset 
                key={asset.name} 
                asset={asset} 
            />
          )}
          </>
    )
}






