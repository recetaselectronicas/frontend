import React from 'react';
import Suggestion from './Suggestion';

export default function Suggestions(props) {
  return props.data.map(suggestion => (
    <Suggestion
      key={suggestion.id}
      onSelectSuggestion={props.onSelectSuggestion}
      data={suggestion}
    />
  ));
}
