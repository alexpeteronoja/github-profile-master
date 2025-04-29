function ProfileDetails(props) {
  return (
    <>
      <div className="d-flex flex-column flex-lg-row">
        <div className="profile-img">
          <img src={props.profileImg} alt="" />
        </div>
        <div className="d-flex flex-column flex-lg-row my-3">
          <div className="py-2 px-3 my-1 mx-lg-2 mt-lg-4  profile-details">
            Followers | {props.followers}
          </div>
          <div className="py-2 px-3 my-1 mx-lg-2 mt-lg-4 profile-details">
            Following | {props.following}
          </div>
          <div className="py-2 px-3 my-1 mx-lg-2 mt-lg-4 profile-details">
            Location | {props.location}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
