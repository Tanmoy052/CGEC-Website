"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function PlacementPage() {
  const representatives = [
    {
      name: "Prof. Atanu Maji",
      department: "EE",
      email: "atanudgp@outlook.com",
      phone: "9734762149",
    },
    {
      name: "Prof. Rajib Das",
      department: "ECE",
      email: "rajibdasece@gmail.com",
      phone: "9163309694",
    },
    {
      name: "Prof. Masud Rana",
      department: "ME",
      email: "masud.rana@cgec.org.in",
      phone: "9851012790",
    },
    {
      name: "Prof. Chhandamay Ray",
      department: "CE",
      email: "chhandamayray@yahoo.com",
      phone: "9903194589",
    },
    {
      name: "Prof. Arghya Chakraborty",
      department: "BSH",
      email: "pikaiarghya@gmail.com",
      phone: "8617455414",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-4 mb-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="font-semibold text-blue-600">Placement</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Message from the Training and Placement Officer
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-justify mb-12">
          <p className="font-semibold text-gray-900">
            Dear Students, Faculty, and Industry Partners,
          </p>
          <p>
            I am delighted to connect with you through this message. As the
            Training and Placement Officer (TPO) of Cooch Behar Government
            Engineering College, I take immense pride in the progress we have
            made together and the milestones we have achieved in the realm of
            student placements and professional development.
          </p>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              To Our Students:
            </h3>
            <p>
              You are the heart of our institution, and your success is our
              primary goal. Your journey through the rigorous curriculum and
              diverse training programs is designed to equip you with the
              knowledge and skills required to excel in the professional world.
              We understand the challenges you face and are committed to
              supporting you every step of the way. Take full advantage of the
              resources, guidance, and opportunities provided to you. Remember,
              the effort you put in today will shape your future.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              To Our Faculty:
            </h3>
            <p>
              Your dedication to nurturing young minds is commendable. The role
              you play in molding our students into competent professionals is
              invaluable. Your continuous support and collaboration with the
              Training and Placement Cell ensure that our students are not only
              academically sound but also ready to meet industry demands. Thank
              you for your unwavering commitment and hard work.
            </p>
          </div>

          <div>
            <div className="w-full lg:w-56 float-none lg:float-right ml-0 lg:ml-6 mb-6 lg:mb-2">
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md border border-gray-200 bg-gray-100">
                <Image
                  src="https://cgec.org.in/img/Faculty/Somen_P.jpg"
                  alt="Prof. Somen Mondal, TPO"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              To Our Esteemed Industry Partners:
            </h3>
            <p>
              Your collaboration and support have been instrumental in our
              students&apos; success. By providing internships, placements, and
              real-world insights, you bridge the gap between academia and
              industry. We deeply value your association and look forward to
              further strengthening our ties. Together, we can ensure that our
              graduates are well-prepared to contribute meaningfully to your
              organizations and the broader industry.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Our Vision and Commitment:
            </h3>
            <p className="mb-4">
              At Cooch Behar Government Engineering College, we strive to
              maintain a dynamic and responsive Training and Placement Cell that
              continuously adapts to the evolving needs of the industry. We are
              committed to providing our students with the best training,
              resources, and opportunities to ensure their holistic development
              and successful careers.
            </p>
            <p>
              As we move forward, our focus remains on enhancing our training
              programs, expanding our network of industry partners, and
              facilitating meaningful placements for our students. We are
              excited about the future and confident in our ability to achieve
              even greater success through collaborative efforts.
            </p>
          </div>

          <p>
            In conclusion, I extend my heartfelt gratitude to everyone who has
            been part of this journey. Your contributions are invaluable, and
            your support is deeply appreciated. Let us continue to work together
            to build a brighter future for our students and our institution.
          </p>

          <p>Thank you, and best wishes for continued success.</p>

          <div className="pt-4">
            <p>Warm regards,</p>
            <p className="font-bold text-gray-900">Prof. Somen Mondal</p>
            <p>Training and Placement Officer (TPO)</p>
            <p>Cooch Behar Government Engineering College</p>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Contacts TPO Cell:
          </h2>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8 inline-block">
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              Prof. Somen Mondal (Head, TPO Cell)
            </h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>9331892632</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <a
                  href="mailto:placement@cgec.org.in"
                  className="text-blue-600 hover:underline"
                >
                  placement@cgec.org.in
                </a>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Other TPO Cell Faculty Representatives:
          </h3>

          <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">
                    Name of The Faculty
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-700 w-32 border-r border-gray-200">
                    Department
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">
                    Email
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-700 w-40">
                    Ph
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {representatives.map((rep, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800 font-medium border-r border-gray-200">
                      {rep.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600 border-r border-gray-200">
                      {rep.department}
                    </td>
                    <td className="py-3 px-4 text-gray-600 border-r border-gray-200">
                      <a
                        href={`mailto:${rep.email}`}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3" />
                        {rep.email}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-blue-600" />
                        {rep.phone}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
