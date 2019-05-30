import React from 'react';
import Suggestion from './Suggestion';

export default function Suggestions(props) {
  return props.data.map(suggestion => (
    <Suggestion
      onSelectSuggestion={props.onSelectSuggestion}
      data={suggestion}
    />
  ));
}
