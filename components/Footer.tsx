import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold">
                N
              </div>
              <h3 className="text-xl font-bold text-white">New10Lab</h3>
            </div>
            <p className="text-sm mb-4">
              India&apos;s most trusted diagnostic laboratory with NABL certified facilities.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FiFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Our Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Health Packages</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Book Home Visit</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Download Reports</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Find Lab Near You</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Pathology Tests</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Radiology Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Health Checkups</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Genetic Testing</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Doctor Consultation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Corporate Wellness</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FiPhone className="mt-1 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Customer Care</p>
                  <p>9003130800</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <FiMail className="mt-1 text-teal-400 flex-shrink-0" />
                <div>
                  <p>support@new10lab.com</p>
                  <p>info@new10lab.com</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-1 text-purple-400 flex-shrink-0" />
                <p>152/3, 6th Avenue,<br />Anna Nagar East,<br />Chennai - 600 102</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; 2024 New10Lab. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
