
// export default function Footer() {
//   return (
//     <footer className="bg-white text-center py-4 text-sm text-gray-700 shadow-inner">
//       <p>&copy; {new Date().getFullYear()} <span className="font-semibold">HealthPredict</span>. All rights reserved.</p>
//     </footer>
//   );
// }


export default function Footer() {
  return (
    <footer className="bg-white bg-opacity-90 backdrop-blur-md text-center py-6 text-sm text-gray-600 shadow-inner mt-10 select-none">
      <p>
        © {new Date().getFullYear()}{' '}
        <span className="font-semibold text-blue-700">HealthPredict</span>. All rights reserved.
      </p>
    </footer>
  );
}

