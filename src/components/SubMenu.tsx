export default function ChildMenu({ item }: any) {
  const nestedMenus = (item?.menu || []).map((item: any) => {
    return <ChildMenu key={item.id} item={item} type="child" />;
  });
  return (
    <div style={{ marginLeft: "25px", marginTop: "10px" }}>
      <div>
        <span
          onClick={() => {
            localStorage.setItem("isChildMenu", JSON.stringify(true));
            localStorage.setItem("menuItem", JSON.stringify(item));

            console.log(
              JSON.parse(localStorage.getItem("menuItem") || "").key,
              item.key
            );
          }}
          
        >
          {Object.keys(item).length !== 0 ? (
            <ul>
              <li
                className={
                  localStorage.getItem("menuItem") !== null
                    ? JSON.parse(localStorage.getItem("menuItem") || "").key ===
                      item.key
                      ? "addedMenu-link active"
                      : "addedMenu-link"
                    : ""
                }
              >
                {" "}
                {item.content}
              </li>
            </ul>
          ) : (
            ""
          )}
        </span>
      </div>

      {/* recursive component call */}
      {nestedMenus}
    </div>
  );
}
