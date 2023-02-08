import { useEffect, useState } from "react";
import {
  Button,
  ChevronDownMediumIcon,
  Form,
  FormButton,
  FormInput,
  Menu,
  Popup,
} from "@fluentui/react-northstar";
import SubMenu from "./SubMenu";

const initialState = {
  contnt: "",
};

export default function Header() {
  const [menuData, setMenuData] = useState<any>(initialState);
  const [menu, setMenu] = useState<any>([]);
  const [selectedMenu, setSelectedMenu] = useState<any>([]);

  const menuItem = [
    {
      key: "header",
      content: "Header",
      on: "hover",
      menu: [
        {
          key: "sub-header",
          content: "Sub Header",
          on: "hover",
          menu: [
            {
              key: "nested-header",
              content: "Nester Sub header",
              on: "hover",
            },
          ],
        },
      ],
    },

    {
      key: "tutorial",
      content: "Tutorial",
      on: "hover",
      menu: [
        {
          key: "sub-tutorial",
          content: "Sub Tutorial",
          on: "hover",
          menu: [
            {
              key: "nested-tutorial",
              content: "Nester Sub Tutorial",
              on: "hover",
            },
          ],
        },
      ],
    },
  ];

  localStorage.setItem("menus", JSON.stringify(menuItem));

  useEffect(() => {
    const menuBars = JSON.parse(localStorage.getItem("menus") || "[]");
    setMenu(menuBars);
  }, []);

  /**
   * handle submit menu
   */
  const handleSubmit = () => {
    let isChildMenu: boolean =
      localStorage.getItem("isChildMenu") !== null
        ? JSON.parse(localStorage.getItem("isChildMenu") || "")
        : "";
    let selectedItem: any =
      localStorage.getItem("menuItem") !== null
        ? JSON.parse(localStorage.getItem("menuItem") || "")
        : "";
    const temp = {};
    if (isChildMenu) {
      let filter = menu.filter((x: any) => x.content === selectedMenu.content);
      let subMenuFilter = filter[0].menu.filter(
        (x: any) => x.key === selectedItem.key
      );
      subMenuFilter[0]["on"] = "hover";
      subMenuFilter[0].menu.push(menuData);
      localStorage.setItem("menus", JSON.stringify(subMenuFilter));
      localStorage.removeItem("isChildMenu");
    } else {
      if (selectedMenu.menu) {
        let filter = menu.filter((x: any) => x.key === selectedMenu.key);
        filter[0].menu.push(menuData);
        localStorage.setItem("menus", JSON.stringify(filter));
        setSelectedMenu([]);
      } else {
        menu.push(menuData);
        setMenu([...menu, temp]);
        localStorage.setItem("menus", JSON.stringify(menu));
      }
    }
    setMenuData(initialState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let menuObj = {
      key: e.target.value,
      content: e.target.value,
      menu: [],
      on: "hover",
    };
    setMenuData(menuObj);
  };

  /**
   * render menu Data
   * @returns
   */
  const renderMenuItem = () => {
    return menu.length > 0
      ? menu.map((i: any) => {
          return (
            <>
              {Object.keys(i).length !== 0 ? (
                <li
                  onClick={() => {
                    setSelectedMenu(i);
                  }}
                >
                  <h6>{i.key}</h6>
                  <SubMenu item={i} />
                </li>
              ) : (
                ""
              )}
            </>
          );
        })
      : "";
  };

  return (
    <div className="headerModule">
      <Menu defaultActiveIndex={0} items={menu} />
      <Popup
        trapFocus
        trigger={
          <Button
            icon={<ChevronDownMediumIcon />}
            content="Setting"
            className="button"
          />
        }
        content={
          <>
            <div></div>
            <div className="settingModelBody">
              <h4 className="addFormTitle">Add navigation</h4>
              <div className="form-block">
                <Form
                  onSubmit={() => {
                    handleSubmit();
                  }}
                  className="addMenuForm"
                >
                  <FormInput
                    label="Menu"
                    name="menuName"
                    id="menu-name"
                    className="addMenuForm-field"
                    required
                    showSuccessIndicator={false}
                    onChange={(e: any) => handleChange(e)}
                  />
                  <ul className="addedMenu">{renderMenuItem()}</ul>

                  <FormButton content="Submit" />
                </Form>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}
