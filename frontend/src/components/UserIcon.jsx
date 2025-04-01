export function UserIcon({ userIcon }) {
    const hasUserIcon = userIcon !== '' ? true : false;

    return (
        <div style={{ width: "2.75rem" }} className="fs-1 me-2">
            {
                hasUserIcon ?
                    <img className="img-fluid rounded-circle mb-2" src={userIcon} /> :
                    <i className="bi bi-person-circle text-white fs-1 me-2"></i>
            }
        </div>
    )
}
