import $ from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={$.maincontainer}>
      <div className={$.loadingbox}>
        <div className={$.loader}></div>
        <div>Loading </div>
      </div>
    </div>
  );
};
