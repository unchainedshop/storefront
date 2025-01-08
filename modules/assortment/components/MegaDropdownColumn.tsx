import React from "react";
import Link from "next/link";
import { useIntl } from "react-intl";
import classNames from "classnames";
import { useDesktopNavigationContext } from "./DesktopNavigationContext";
import Thumbnail from "../../common/components/thumbnail";

export type Node = {
  slug: string;
  children: any[];
  path: string[];
  navigationTitle: string;
  type: "default" | "show_all";
  media: any[];
};

const MegaDropdownItem = ({
  slug,
  children,
  navigationTitle,
  type,
  path,
  media = [],
}: Partial<Node>) => {
  const intl = useIntl();
  const { setHoverPath, hoverPath, isTouching } = useDesktopNavigationContext();
  const handleClick = () => {
    if (type === "default" && isTouching && children) {
      setHoverPath(path);
    } else {
      setHoverPath([]);
    }
  };

  const handleMouseEnter = () => {
    setHoverPath(path);
  };

  const handleTouchStart = () => {
    setHoverPath(path);
  };
  return (
    <Link
      href={`/${path.join("/")}`}
      className={classNames("mega-link", {
        "has-arrow": type === "default" && Object.keys(children || {}).length,
      })}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      data-in-hover-path={type === "default" && hoverPath?.includes(slug)}
    >
      <div className="flex items-baseline">
        {type === "default" ? (
          <>
            <Thumbnail media={media} />
            {navigationTitle}
          </>
        ) : (
          <b>
            {navigationTitle}
            &nbsp;
          </b>
        )}

        {type === "show_all" ? (
          <small className="ml-2">
            {intl.formatMessage({
              id: "show_all",
              defaultMessage: "Show all",
            })}
          </small>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
};

const MegaDropdownColumn = ({
  ...rest
}: Partial<Node> & { columnIndex?: number }) => {
  return (
    <div className="inline-block w-1/3 border-r border-color-grey-lightest">
      <MegaDropdownItem {...rest} type="show_all" />

      {rest.children &&
        Object.entries(rest.children)
          .sort(([, aNode], [, bNode]) => {
            return aNode.index - bNode.index;
          })
          .map(([, subnode]) => (
            <MegaDropdownItem key={subnode._id} {...subnode} type="default" />
          ))}
    </div>
  );
};

MegaDropdownColumn.defaultProps = {
  columnIndex: null,
};

export default MegaDropdownColumn;
