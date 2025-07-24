<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          {{ $t('about.title') }}
        </h1>
        <p class="text-xl text-gray-600">
          {{ $t('about.description') }}
        </p>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
        <div class="prose prose-lg text-gray-700">
          <p class="mb-4">
            Founded in 2024, Zozo Booking started with a simple mission: to connect food lovers 
            with the best restaurants in their area. We believe that great food brings people 
            together and creates memorable experiences.
          </p>
          <p class="mb-4">
            Our platform makes it easy for customers to discover new restaurants, browse menus, 
            and place orders for delivery or pickup. We work closely with local restaurants to 
            ensure they can reach more customers and grow their business.
          </p>
          <p>
            Today, we're proud to serve thousands of customers and partner with hundreds of 
            restaurants across the region, making delicious food more accessible than ever.
          </p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-3xl mb-4">🍽️</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">500+ Restaurants</h3>
          <p class="text-gray-600">Partner restaurants serving diverse cuisines</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-3xl mb-4">👥</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">10,000+ Customers</h3>
          <p class="text-gray-600">Happy customers served every month</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-3xl mb-4">🚚</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
          <p class="text-gray-600">Average delivery time under 30 minutes</p>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <div class="space-y-3 text-gray-600">
              <p class="flex items-center">
                <span class="mr-3">📧</span>
                info@zozobooking.com
              </p>
              <p class="flex items-center">
                <span class="mr-3">📞</span>
                +1 (555) 123-4567
              </p>
              <p class="flex items-center">
                <span class="mr-3">📍</span>
                123 Food Street, Culinary District
              </p>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
            <div class="space-y-2 text-gray-600">
              <p>Monday - Friday: 9:00 AM - 10:00 PM</p>
              <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
              <p class="text-sm text-gray-500 mt-4">
                Customer support available during business hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO
useHead({
  title: 'About Us - Zozo Booking',
  meta: [
    { name: 'description', content: 'Learn about Zozo Booking, our mission to connect food lovers with the best restaurants.' }
  ]
})
</script>