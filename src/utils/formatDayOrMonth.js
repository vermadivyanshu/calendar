export default function formatDayOrMonth (value) {
  if(value) {
    return parseInt(value) > 9 ? value.toString() : '0'+ parseInt(value);
  }
}