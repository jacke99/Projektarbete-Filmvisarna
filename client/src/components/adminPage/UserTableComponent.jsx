export default function UserTableComponent(namn, mobil, email) {
 return (
    <tr>
        <td className="p-2">{namn}</td>
        <td className="p-2">{mobil}</td>
        <td className="p-2">{email}</td>
    </tr>

 )
}