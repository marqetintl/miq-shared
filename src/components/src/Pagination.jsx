import { Button } from './buttons';
import PropTypes from 'prop-types';
import { getClassName } from '@miq/utils';

import './pagination.scss';
import { ArrowLeft, ArrowRight } from './icons';

export const paginationPropTypes = {
  count: PropTypes.number,
  next: PropTypes.string,
  previous: PropTypes.string,
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
};

export const Pagination = ({ count = 0, next, previous, ...props }) => {
  if (!count && next) return null;

  const { onNextClick, onPreviousClick } = props;

  return (
    <div className="miq-pagination miq-container d-flex align-items-center justify-content-between">
      <div className="previous">
        {previous && (
          <Button onClick={onPreviousClick} className="btn-previous">
            Previous
          </Button>
        )}
      </div>

      <div className="next">
        {next && (
          <Button onClick={onNextClick} className="btn-next">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

const anchorPropTypes = {
  pagination: PropTypes.shape({
    is_paginated: PropTypes.bool,
    has_next: PropTypes.bool,
    has_next_page_number: PropTypes.number,
    has_next_url: PropTypes.string,
    has_previous: PropTypes.bool,
    has_previous_page_number: PropTypes.number,
    has_previous_url: PropTypes.string,
    num_pages: PropTypes.number,
    page_obj_number: PropTypes.number,
    per_page: PropTypes.number,
    allow_empty_first_page: PropTypes.bool,
  }),
  href: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.any,
  target: PropTypes.oneOf(['_blank', '_parent', '_self', '_top']),
  id: PropTypes.string,
  className: PropTypes.string,
};

const NextAnchor = ({ pagination, label, children, ...props }) => {
  if (!pagination || !pagination.is_paginated || !pagination.has_next) return null;

  return (
    <a {...props} href={pagination.has_next_url}>
      {children || label || pagination.has_next_page_number}
    </a>
  );
};

NextAnchor.propTypes = anchorPropTypes;

const PreviousAnchor = ({ pagination, label, children, ...props }) => {
  if (!pagination || !pagination.is_paginated || !pagination.has_previous) return null;

  return (
    <a {...props} href={pagination.has_previous_url}>
      {children || label || pagination.has_previous_page_number}
    </a>
  );
};

// source: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};
const DOTS = '...';

const AnchorLinks = ({ pagination, ...props }) => {
  if (!pagination || !pagination.is_paginated) return null;

  const { num_pages, page_obj_number } = pagination;

  const linksRange = () => {
    const siblingCount = props.siblingCount || 1;
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= num_pages) return range(1, num_pages);

    const leftLinkIdx = Math.max(page_obj_number - siblingCount, 1);
    const rightLinkIdx = Math.min(page_obj_number + siblingCount, num_pages);
    const hasLDots = leftLinkIdx > 2;
    const hasRDots = rightLinkIdx < num_pages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = num_pages;

    if (!hasLDots && hasRDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, num_pages];
    }

    if (hasLDots && !hasRDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(num_pages - rightItemCount + 1, num_pages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (hasLDots && hasRDots) {
      let middleRange = range(leftLinkIdx, rightLinkIdx);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    return [];
  };

  return (
    <div className="miq-pagination-links d-flex align-items-center">
      {pagination.has_previous && (
        <div className="item">
          <PreviousAnchor pagination={pagination}>
            <ArrowLeft className="icon" />
          </PreviousAnchor>
        </div>
      )}

      {linksRange().map((item, i) => {
        if (item === DOTS)
          return (
            <div className="item empty" key={`${item}${i}`}>
              {item}
            </div>
          );

        const path = new URL(location.href);
        path.searchParams.set('page', item);

        return (
          <div className={getClassName(['item', item === page_obj_number && 'current'])} key={`${item}${i}`}>
            <a href={`${path.pathname}${path.search}`} className="item-link">
              {item}
            </a>
          </div>
        );
      })}

      {pagination.has_next && (
        <div className="item">
          <NextAnchor pagination={pagination}>
            <ArrowRight className="icon" />
          </NextAnchor>
        </div>
      )}
    </div>
  );
};

PreviousAnchor.propTypes = anchorPropTypes;

Pagination.propTypes = paginationPropTypes;

Pagination.Links = AnchorLinks;
Pagination.NextAnchor = NextAnchor;
Pagination.PreviousAnchor = PreviousAnchor;
