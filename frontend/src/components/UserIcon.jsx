export function UserIcon({ userIcon }) {
    const hasUserIcon = userIcon !== '' ? true : false;

    return (
        <div style={{ width: "2.5rem" }}>
            {
                hasUserIcon ?
                    <img className="img-fluid rounded-circle" src={userIcon} /> :
                    <i className="bi bi-person-circle"></i>
            }
        </div>
    )
}
