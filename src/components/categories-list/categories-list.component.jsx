import './categories-list.styles.scss'
import CategoryItem from '../category-item/category-item.component' 

const CategoriesList = ({categories}) => {
  return (
    <div className='categories-list-container'>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
    ))}
    </div>
  )
}

export default CategoriesList
