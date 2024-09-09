import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <img
      src="https://res.cloudinary.com/dxrszpxbx/image/upload/v1723646644/fvhu4jwtc2synx7hiefv.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="page-msg">Page Not Found</h1>
    <p className="description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
