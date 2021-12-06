import { Button } from "./buttons";
import PropTypes from "prop-types";

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

Pagination.propTypes = paginationPropTypes;
