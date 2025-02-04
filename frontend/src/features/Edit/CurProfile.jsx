export function CurProfile({profilePicture, description}){
    return(
    <div className="container">
        <div className="row justify-content-center align-self-center">
            <div className="col-xxl-8">
            <div>
                <h4 className="mb-4 mt-0 btn btn-primary btn-lg">Profile Photo</h4>
            </div>
                <form>
                    <div className="row g-3 text-center justify-content-center align-self-center">
                        <img className="rounded-circle shadow-4-strong w-50 h-50" src={profilePicture}/>
                            <div className="text-center">
                                <div className="square position-relative display-2 mb-3">
                                    <i className="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary"></i>
                                </div>
                                <input type="file" id="customFile" name="file" hidden=""/>
                                <label className="btn btn-success-soft btn-block" htmlFor="customFile">Upload</label>
                                <button type="button" className="btn btn-danger-soft">Remove</button>
                                <p className="text-muted mt-3 mb-0"><span className="me-1">Note:</span>Please use appropriate pictures</p>
                            </div>
                        </div>

                <div className="mb-3">
                        <label htmlFor="inputDescription" className="form-label">
                            <h4 className="mb-4 mt-0 btn btn-primary btn-lg">Description</h4>
                        </label>
                        <input type="text" className="form-control bg-primary" placeholder={description} id="inputDescription"/>
                </div>
                <div className="gap-3 d-md-flex justify-content-center text-center">
                    <label className="btn btn-primary btn-lg">
					    <input type="submit"/>
                    </label>
                    <label className="btn btn-primary btn-lg">
					    <input type="reset"/>
                    </label>
				</div>
                </form>
            </div>
        </div>
    </div>
    )
}

/*
export function PostFeed({ posts }) {
    return (
        <>
            <div className='w-100 h-auto ms-auto'>
                {
                    posts.map((post, index) => <PostPreview postDetails={post} key={index} />)
                }
            </div>
        </>
    )
}

*/