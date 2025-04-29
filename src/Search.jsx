import searchImg from './assets/Search.svg';

function Search(props) {
  return (
    <div className="  py-5 search-container">
      <div className=" pb-2">
        <form action="">
          <div className="position-relative">
            <div className="position-absolute search-btn-container">
              <button
                onClick={props.handleSubmit}
                type="submit"
                className="bg-transparent search-btn"
              >
                <img src={searchImg} alt="" />
              </button>
            </div>

            <div>
              <input
                className="py-2 text-white search-form"
                type="text"
                name=""
                id=""
                placeholder="username"
                value={props.value}
                onChange={props.handleChange}
              />
            </div>
          </div>
        </form>
      </div>

      {props.showSuggestions && (
        <div
          onClick={props.handleSuggest}
          className="d-flex column-gap-3 drop-container py-2 px-3"
        >
          <div>
            <img className="dropdown-img" src={props.dropImg} alt="" />
          </div>
          <div className="my-2">
            <p>{props.dropName}</p>
            <p>{props.dropBio}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
