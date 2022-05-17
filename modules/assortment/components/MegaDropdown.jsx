import React from 'react';

import classNames from 'classnames';
import MegaDropdownColumn from './MegaDropdownColumn';
import { useDesktopNavigationContext } from './DesktopNavigationContext';

const findChildBySlug = (node, slug) => {
  return (
    node.children &&
    Object.entries(node.children).find(
      ([, childNode]) => childNode.slug === slug,
    )
  );
};

const getColumn = (node, hoverPath, columnIndex) => {
  if (hoverPath.length <= columnIndex || !node) {
    return [null, null];
  }
  if (hoverPath.includes(node.slug)) {
    return findChildBySlug(node, hoverPath[columnIndex]) || [null, null];
  }
  return [null, null];
};

const MegaDropdown = ({ dataInHoverPath, ...rest }) => {
  const { setHoverPath, isTouching, hoverPath } = useDesktopNavigationContext();

  const [, secondColumnNode] = getColumn(rest, hoverPath, 1);

  const [, thirdColumnNode] = getColumn(
    secondColumnNode,
    hoverPath,

    2,
  );

  return (
    <div
      className={classNames(
        'nav--main__mega invisible absolute left-24 right-24 top-14 flex overflow-hidden opacity-100 shadow-md delay-150',
        {
          'visible overflow-visible bg-white opacity-100 dark:bg-slate-500':
            dataInHoverPath,
        },
      )}
      onMouseEnter={() => {
        if (!isTouching) setHoverPath(rest?.path);
      }}
      onMouseLeave={() => {
        if (!isTouching) setHoverPath([]);
      }}
      onBlur={() => {
        if (!isTouching) setHoverPath([]);
      }}
    >
      <MegaDropdownColumn
        columnIndex={0}
        {...rest}
        key="mega-dropdown-column-1"
      />
      {secondColumnNode?.children ? (
        <MegaDropdownColumn
          {...secondColumnNode}
          key="mega-dropdown-column-2"
        />
      ) : (
        <div className="mega-col inline-block w-1/3 border-r border-color-grey-lightest" />
      )}
      {thirdColumnNode?.children ? (
        <MegaDropdownColumn {...thirdColumnNode} key="mega-dropdown-column-3" />
      ) : (
        ''
      )}
    </div>
  );
};

export default MegaDropdown;
