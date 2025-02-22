import { useRef, useState } from "react"


const defaultForm = {
  category: '',
  total: '',
  asset: '',
  percentage: ''
}


export default function Form({ all, setAll }) {
  const [existing, setExisting] = useState(false)
  const [existingAsset, setExistingAsset] = useState(false)

  const [form, setForm] = useState(defaultForm)


  function handleSubmit(e) {
    e.preventDefault()

    let index = all.findIndex(a => a.category === form.category.toUpperCase())
    let exists = index >= 0 ? true : false

    const asset = {
      name: form.asset.toUpperCase(),
      value: Number(form.percentage)
    }

    let newAll = [...all]
    let total = Number(form.total)

    if (exists) {
      let group = newAll[index]
      let totalPercentage = group.assets.reduce((acc, curr) => acc + curr.value, 0)

      if (total !== group.total) {
        group.total = total
      }

      // did the user input the asset name
      if (asset.name) {
        // is it an asset that already exists
        if (existingAsset) {
          let foundAsset = group.assets.find(a => a.name == form.asset)
          // asset value lowered
          if (foundAsset.value >= Number(form.percentage)) {
            foundAsset.value = Number(form.percentage)
          } else {
            // asset value increasing
            if ((asset.value - foundAsset.value) + totalPercentage > 100) {
              return alert('Percentage too high. Used: ' + asset.value + '. Available: ' + (100 - totalPercentage))
            }
            foundAsset.value = Number(form.percentage)
          }
        } else {
          if (totalPercentage + asset.value > 100) {
            return alert('Percentage too high. Used: ' + asset.value + '. Available: ' + (100 - totalPercentage))
          }
          group.assets.push(asset)
        }
      }

    } else {
      const group = {
        category: form.category.toUpperCase(),
        total: total,
        assets: [asset]
      }
      newAll.push(group)
    }

    setAll(newAll)
    setForm(defaultForm)
    setExisting(false)
    setExistingAsset(false)
    localStorage.setItem('groups', JSON.stringify(newAll))
  }


  function handleChange(e) {
    let newForm = { ...form }
    if (e.target.nodeName === 'SELECT') {
      if (e.target.name === 'category') {
        newForm.total = all.find(g => e.target.value == g.category).total
        newForm.asset = ''
        newForm.percentage = ''
        newForm[e.target.name] = e.target.value
        setExistingAsset(false)
      } else {
        newForm[e.target.name] = e.target.value
      }
    } else {
      newForm[e.target.name] = e.target.value
    }
    setForm(newForm)
  }

  function handleCategoryClick() {
    if (!existing)
      setForm({ ...form, total: all[0].total, category: all[0].category })
    else {
      setForm(defaultForm)
      setExistingAsset(false)
    }
 
    setExisting(!existing)
  }

  function handleAssetClick() {
    let group = all.find(g => form.category == g.category)
    console.log(group.assets[0].name)
    if (!existingAsset)
      setForm({ ...form, asset: group.assets[0].name })
    else {
      setForm({ ...form, asset: '' })
    }

    setExistingAsset(!existingAsset)
  }

  function handleRemoveAsset(e) {
    e.preventDefault()
    let newAll = [...all]
    const group = newAll.find(c => c.category === form.category.toUpperCase())
    const index = group.assets.findIndex(a => a.name === form.asset.toUpperCase())
    group.assets.splice(index, 1)
    setAll(newAll)
    setForm(defaultForm)
    setExisting(false)
    setExistingAsset(false)
    localStorage.setItem('groups', JSON.stringify(newAll))
  }

  function handleRemoveCategory(e) {
    e.preventDefault()
    let newAll = [...all]
    const index = newAll.findIndex(c => c.category === form.category.toUpperCase())
    newAll.splice(index, 1)
    setAll(newAll)
    setForm(defaultForm)
    setExisting(false)
    setExistingAsset(false)
    localStorage.setItem('groups', JSON.stringify(newAll))
  }

  return (
    <form className='asset-form'>
      <label htmlFor="category">Category <span onClick={handleCategoryClick}>{existing ? 'new' : 'old'}</span></label>
      {!existing ?
        <input
          type="text"
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required={true}
        />
        :
        <select value={form.category} onChange={handleChange} name='category' required={true}>
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
      <input 
        type="number" 
        id="total" 
        value={form.total} 
        onChange={handleChange} 
        name='total' 
        min={1} 
      />
      <label htmlFor="asset">Asset {existing && <span onClick={handleAssetClick}>{existingAsset ? 'new' : 'old'}</span>}</label>
      {!existingAsset ?
        <input
          type="text"
          id="asset"
          name="asset"
          value={form.asset}
          onChange={handleChange}
        />
        :
        <select value={form.asset} onChange={handleChange} name='asset'>
          {all.find(g => g.category == form.category).assets.map(asset =>
            <option
              key={asset.name}
              value={asset.name}
            >
              {asset.name}
            </option>
          )}
        </select>
      }
      <label htmlFor="percent" >Percentage</label>
      <input 
        type="number" 
        max={100} 
        min={1} 
        id="percent" 
        value={form.percentage}
        onChange={handleChange}
        name='percentage' 
      />
      <div>
      <button onClick={handleSubmit}>{existing ? 'Update' : 'Submit'}</button>
      {existingAsset && <button onClick={handleRemoveAsset}>Remove Asset </button>}
      {existing && <button onClick={handleRemoveCategory}>Remove Category </button>}
      </div>
    </form>
  )
}