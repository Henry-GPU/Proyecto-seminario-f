import '../stylesheet/ProductDashboard.css'
import ProductInventory from './ProductInventory'
import url from '../config/url'
function ProductDashboard(){

    return(
        <ProductInventory
          url={url}
        /> 
    )
}

export default ProductDashboard;