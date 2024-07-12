export default function getAvatar(name: string) {
  // get 2 letter to create avatar
  const nameSplit = name.split(" ");
  if (nameSplit.length === 1) {
    const firstLetter = nameSplit[0].charAt(0);
    const secondLetter = nameSplit[0].charAt(1);
    const avatar = firstLetter.toUpperCase() + secondLetter.toUpperCase();
    return avatar;
  }
  const firstLetter = nameSplit[0].charAt(0);
  const secondLetter = nameSplit[1].charAt(0);
  const avatar = firstLetter.toUpperCase() + secondLetter.toUpperCase();
  return avatar;
}
