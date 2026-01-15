from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .models import Product, Category

@api_view(['GET'])
def products(request):
    """Get all products with filters"""
    category = request.GET.get('category', 'all')
    search = request.GET.get('search', '')
    
    products = Product.objects.all()
    
    # Filter by category
    if category != 'all':
        products = products.filter(category__name__icontains=category)
    
    # Search filter
    if search:
        products = products.filter(
            Q(name__icontains=search) | 
            Q(brand__icontains=search)
        )
    
    # Format for frontend
    data = []
    for p in products:
        data.append({
            'id': p.id,
            'name': p.name,
            'brand': p.brand,
            'category': {'name': p.category.name},
            'price': p.price,
            'originalPrice': p.original_price,
            'discount': p.discount,
            'rating': p.rating,
            'img': p.img,
            'desc': p.desc
        })
    
    return Response(data)

@api_view(['GET'])
def product_detail(request, pk):
    """Get single product details"""
    try:
        product = Product.objects.get(id=pk)
        data = {
            'id': product.id,
            'name': product.name,
            'brand': product.brand,
            'category': {'name': product.category.name},
            'price': product.price,
            'originalPrice': product.original_price,
            'discount': product.discount,
            'rating': product.rating,
            'img': product.img,
            'desc': product.desc
        }
        return Response(data)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)
