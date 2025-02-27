import PropTypes from 'prop-types';

const GenderCheckbox = ({selectedGender, onCheckboxChange}) => {
  return (
    <div className='flex'>
        <div className="form-control">
            <label htmlFor="" className={`label gap-2 cursor-pointer ${selectedGender==="male"? "selected" : ""}`}>
                <span className='label-text'>Male</span>
                <input checked={selectedGender==="male"} onChange={() =>onCheckboxChange("male")} type="checkbox" className='checkbox border-slate-900' />
            </label>
        </div>
        <div className="form-control">
            <label htmlFor="" className={`label gap-2 cursor-pointer ${selectedGender==="female" ? "selected" : ""}`}>
                <span className='label-text'>Female</span>
                <input checked={selectedGender==="female" } onChange={()=> onCheckboxChange("female")} type="checkbox" className='checkbox border-slate-900' />
            </label>
        </div>
    </div>
  )
}
GenderCheckbox.propTypes = {
    selectedGender: PropTypes.string.isRequired,
    onCheckboxChange: PropTypes.func.isRequired,
  };

export default GenderCheckbox