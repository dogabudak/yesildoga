import type {StatusProps} from "./Status";
import {colors} from '../../../style/colors';
import {Donations} from "../../../types/Donations";
import styled from 'styled-components';

const handleColorType = color => {
    // TODO this colors should be compatiple with donation types
    switch (color) {
        case Donations.charity:
            return colors.requested;
        case Donations.education:
            return colors.rejected;
        default:
            return colors.confirmed;
    }
};
export const Status = styled.div<StatusProps>`
  background-color: ${({type}) => handleColorType(type)};
  border: #c4c4c4 1px solid;
  border-radius: 4px;
  display: inline-block;
  padding: 6px 8px;
`;