export function UserIcon({ userIcon }) {
    const hasUserIcon = userIcon !== '' ? true : false;

    return (
        <>
            {
                hasUserIcon ?
                    <img src={userIcon} /> :
                    <i className="bi bi-person-circle"></i>
            }
        </>
    )
}
