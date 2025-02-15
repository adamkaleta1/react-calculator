import PropTypes from "prop-types"
import { ACTIONS } from './helpers'

export default function DigitButton({ dispatch, operation }) {
    return (
        <button
            onClick={() =>
                dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
            }
        >
            {operation}
        </button>
    )
};

DigitButton.propTypes = {
    dispatch: PropTypes.func.isRequired,
    operation: PropTypes.string.isRequired
}