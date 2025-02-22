import { useRef, useState } from "react"


export default function Form({ all, setAll }) {
    const [existing, setExisting] = useState(false)

    const assetRef = useRef(null)
    const percRef = useRef(null)
    const catRef = useRef(null)
    const totalRef = useRef(null)

    function handleSubmit(e) {
        e.preventDefault()
    
        let index = all.findIndex(a => a.category === catRef.current.value.toUpperCase())
        let exists = index >= 0 ? true : false
    
        const asset = {
          name: assetRef.current.value.toUpperCase(),
          value: Number(percRef.current.value)
        }
    
        let newAll = [...all]
        let total = Number(totalRef.current.value)
    
        if (exists) {
          let group = newAll[index]
          let totalPercentage = group.assets.reduce((acc, curr) => acc + curr.value, 0)
          
          if (totalPercentage + asset.value > 100) {
            return alert('Percentage too high. Used: ' + asset.value + '. Available: ' + (100 - totalPercentage))
          }
    
          if (total !== group.total) {
            group.total = total
          }

          if (asset.name) {
            group.assets.push(asset)
          }

        } else {
          const group = {
            category: catRef.current.value.toUpperCase(),
            total: total,
            assets: [asset]
          }
          newAll.push(group)
        }
    
        setAll(newAll)
    
        assetRef.current.value = ''
        percRef.current.value = ''
        catRef.current.value = ''
        totalRef.current.value = ''
      }

    return (
        <form className='asset-form' onSubmit={handleSubmit}>
      <label htmlFor="category">Category <span onClick={() => {
        if (!existing)
          totalRef.current.value = all[0].total
        setExisting(!existing)
      }}>{existing ? 'new' : 'old'}</span></label>
          {!existing ? 
            <input type="text" id="category" ref={catRef}/>  
           :
            <select ref={catRef} onChange={() => {
              const group = all.find(g => g.category == catRef.current.value)
              if (group)
                totalRef.current.value = group.total
              else
                totalRef.current.value = ''
            }}>
              {all.map(group => 
                <option 
                    key={group.category} 
                    value={group.category}
                >
                    {group.category}
                </option>
              )}
            </select>
          }
                    <label htmlFor="total">Total</label>
                    <input type="number" id="total" ref={totalRef} min={1} />
          <label htmlFor="asset">Asset</label>
          <input type="text" id="asset" ref={assetRef}/>
          <label htmlFor="percent" >Percentage</label>
          <input type="number" max={100} min={1} id="percent" ref={percRef} />
          <button>Submit </button>
      </form>
    )
}